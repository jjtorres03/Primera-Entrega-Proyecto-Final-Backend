const express = require("express");
const productsRouter = express.Router();
const ManagerProductos = require("../controllers/managerProductos.js");
const managerProductos = new ManagerProductos("src/data/productos.json");
const { validationUrl, auth, validationBody } = require("../controllers/middleware");

productsRouter.get("/", async (req, res) => {
    let list = await managerProductos.getAll();
    list.status === "error" ? res.status(400).send(list) : res.send(list);
});

productsRouter.get("/:id", validationUrl, async (req, res) => {
    let item = await managerProductos.getById(parseInt(req.params.id));
    item.status === "error" ? res.status(400).send(item) : res.send(item);
});

productsRouter.post("/", auth, validationBody, async (req, res) => {
    res.send(await managerProductos.create(req.body));
});

productsRouter.put("/:id", auth, validationUrl, validationBody, async (req, res) => {
    let item = await managerProductos.modifyById(parseInt(req.params.id), req.body);
    item.status === "error" ? res.status(400).send(item) : res.send(item);
});

productsRouter.delete("/:id", auth, validationUrl, async (req, res) => {
    let item = await managerProductos.deleteById(parseInt(req.params.id));
    item.status === "error" ? res.status(400).send(item) : res.send(item);
});

module.exports = productsRouter;



/* ---- Harcodeo los Datos  ---- */

/* 

{
   "nombre": "Calculadora",
   "descripcion": "Científica",
   "codigo": "X-P1",
   "foto": "https://www.bing.com/images/search?view=detailV2&ccid=7AtPw2O8&id=080E7F25CE2863245808E6DADA9B8E93BEDDFE65&thid=OIP.7AtPw2O8Am33dHOwj9VjtQHaHa&mediaurl=https%3a%2f%2fimages.jumpseller.com%2fstore%2flibrerias-blue-mix%2f5297691%2f4413116_1.jfif%3f1627485756&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.ec0b4fc363bc026df77473b08fd563b5%3frik%3dZf7dvpOOm9ra5g%26pid%3dImgRaw%26r%3d0&exph=1500&expw=1500&q=calculadora+cientifica&simid=608027594243001539&FORM=IRPRST&ck=0F5E6E1688FD1F17F35A1D6BB4CF90B1&selectedIndex=8&ajaxhist=0&ajaxserp=0",
   "precio": 200,
   "stock": 50
}

   "nombre": "Tijera",
   "descripcion": "Plastico",
   "codigo": "X-P2",
   "foto": "https://www.bing.com/images/search?view=detailV2&ccid=J898xuDB&id=D41946D232162C1A0152FBD4C2BFF61A14563D8B&thid=OIP.J898xuDBslGxjrO4IbRpWQHaHa&mediaurl=https%3a%2f%2flibreriairbe.com%2fwp-content%2fuploads%2f2021%2f06%2fTijera-13-cm-de-Plastico-Escolar-Punta-Roma-Color-Aleatorio.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.27cf7cc6e0c1b251b18eb3b821b46959%3frik%3diz1WFBr2v8LU%252bw%26pid%3dImgRaw%26r%3d0&exph=1000&expw=1000&q=tijeras+de+plastico&simid=608026078115600420&FORM=IRPRST&ck=FB477A89B21AE9E4A26D7F413F0F2EFD&selectedIndex=0&ajaxhist=0&ajaxserp=0",
   "precio": 100,
   "stock": 30





*/