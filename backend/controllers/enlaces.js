const { generateError, createPathIfNotExists } = require("../helpers");
const { createEnlace } = require("../db/enlaces");
const path = require("path");
const sharp = require("sharp");
const { nanoid } = require("nanoid");
const {
  getAllEnlaces,
  getEnlaceById,
  deleteEnlaceById,
  votarEnlace,
  borrarVotoEnlace,
} = require("../db/enlaces");

const getEnlacesController = async (req, res, next) => {
  try {
    const enlaces = await getAllEnlaces();
    res.send(enlaces);
  } catch (error) {
    next(error);
  }
};

const newEnlaceController = async (req, res, next) => {
  try {
    const { text, title, url } = req.body;
    if (!text || text.length > 280) {
      throw generateError("El texto es obligatorio maximo 280 caracteres", 400);
    }
    if (!title || title.length > 100) {
      throw generateError(
        "El titulo es obligatorio maximo 100 caracteres",
        400
      );
    }
    if (!url || url.length > 150) {
      throw generateError("La url es obligatorio maximo 150 caracteres", 400);
    }
    // Gestionar Imagenes
    let imageFileName;

    if (req.files && req.files.image) {
      const uploadsDir = path.join(__dirname, "../uploads");
      await createPathIfNotExists(uploadsDir);
      const image = sharp(req.files.image.data);
      image.resize(1000);
      imageFileName = `${nanoid(25)}.jpg`;
      await image.toFile(path.join(uploadsDir, imageFileName));
    }

    const id = await createEnlace(req.userId, text, title, url, imageFileName);
    res.send({
      status: "ok",
      message: `Enlace con id: ${id} creado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleEnlaceController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const enlace = await getEnlaceById(id);
    res.send({
      status: "ok",
      message: enlace,
    });
  } catch (error) {
    next(error);
  }
};

const deleteEnlaceController = async (req, res, next) => {
  try {
    const { id } = req.params;

    //Informacion del enlace que quiero borrar
    const enlace = await getEnlaceById(id);

    //Comprobacion dle token

    if (req.userId !== enlace.user_id) {
      throw generateError(
        "Estas intentando borrar un enlace que no es tuyo",
        401
      );
    }

    //Borrar enlace.

    await deleteEnlaceById(id);

    res.send({
      status: "ok",
      message: `El enlace con id: ${id} fue borrado`,
    });
  } catch (error) {
    next(error);
  }
};
const votarEnlaceController = async (req, res, next) => {
  try {
    const { enlaceId } = req.params;

    await votarEnlace(req.userId, enlaceId);
    res.send({
      status: "ok",
      message: `Enlace con id: ${enlaceId} votado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

const borrarVotoController = async (req, res, next) => {
  try {
    const { enlaceId } = req.params;

    await borrarVotoEnlace(req.userId, enlaceId);
    res.send({
      status: "ok",
      message: `Voto a enlace con id: ${enlaceId} borrado correctamente`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEnlacesController,
  newEnlaceController,
  getSingleEnlaceController,
  deleteEnlaceController,
  votarEnlaceController,
  borrarVotoController,
};
