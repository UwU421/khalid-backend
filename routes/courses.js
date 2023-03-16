const express = require('express');
const Joi = require("joi");
const morgan = require('morgan')

const { PDFDocument } = require("pdf-lib");
const fs = require("fs");

const router = express.Router();

router.use(express.json());

router.use((req,res,next) => {
    console.log("logging")
    next()
})

async function getBuffer(url) {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
  
    return arrayBuffer;
  }

let orderNumber = 4586;
const nightPrice = 332.41;
const breakfastPrice = 20 //per night
const toaletPrice = 50
const showerPrice = 2412
const sprayingPrice = 3050
const donerPrice = 100

async function createPDF(body) {
    finalPrice = body[0]
    basics = body[1]
    trips = body[2]
    sales = body[3]

    orderNumber++;
    const pdfDoc = await PDFDocument.create();

    const jpgUrl = 'https://i.imgur.com/gfzR0IE.jpg';
    const jpgImageBytes = await fetch(jpgUrl).then((res) => res.arrayBuffer());
    const unsplashImage = await pdfDoc.embedJpg(jpgImageBytes);

    const newPage = pdfDoc.addPage();

    currentY = newPage.getSize().height

    currentY -= 150
    newPage.drawImage(unsplashImage, {
        x: 20,
        y: currentY,
        width: 96,
        height: 146,
      });
    newPage.drawText("Khalid International S.R.O", {
        x: 120,
        y: currentY + 70,
        size: 40,
      });
      newPage.drawText("Cenová nabídka " + orderNumber.toString(), {
        x: 150,
        y: currentY + 35,
        size: 20,
      });
      newPage.drawRectangle({
        x: 10,
        y:  currentY - 10,
        width: newPage.getSize().width - 20,
        height: 2,
      });
      currentY -= 70
      newPage.drawText("Celková cena: " + finalPrice.toString() + "€", {
        x: 80,
        y: currentY,
        size: 30,
      });
      currentY -= 30
      newPage.drawText("Pocet nocí: " + basics[0].toString() + " * " + nightPrice.toString() + " = " + (basics[0]*nightPrice).toString() + "€", {
        x: 120,
        y: currentY,
        size: 20,
      });

      if (basics[1]) {
        currentY -= 30
      newPage.drawText("Snídane: " + basics[0].toString() + " * " + breakfastPrice.toString() + " = " + (basics[0]*breakfastPrice).toString() + "€", {
        x: 120,
        y: currentY,
        size: 20,
      });
      }

      if (basics[2]) {
        currentY -= 30
      newPage.drawText("Prístup k toaletám: " + basics[0].toString() + " * " + toaletPrice.toString() + " = " + (basics[0]*toaletPrice).toString() + "€", {
        x: 120,
        y: currentY,
        size: 20,
      });
      }
      currentY -= 30

      if (trips[0]) {
        currentY -= 30
      newPage.drawText("MultiKulti sprchy s Khalidem: " + showerPrice.toString() + "€", {
        x: 120,
        y: currentY,
        size: 20,
      });
      }

      if (trips[1]) {
        currentY -= 30
      newPage.drawText("Spraying on the Brandenburgen Gate: " + sprayingPrice.toString() + "€", {
        x: 120,
        y: currentY,
        size: 20,
      });
      }

      if (trips[2]) {
        currentY -= 30
      newPage.drawText("Döner Tür: " + donerPrice.toString() + "€", {
        x: 120,
        y: currentY,
        size: 20,
      });
      }

      currentY -= 30

      if (sales[0] != 0) {
        currentY -= 30
      newPage.drawText("Sleva pro 3+ nohé: " + sales[0].toString() + "€", {
        x: 120,
        y: currentY,
        size: 20,
      });
      }

      if (sales[1] != "") {
        currentY -= 30
      newPage.drawText("Sportnovní sleva: " + sales[1], {
        x: 120,
        y: currentY,
        size: 20,
      });
      }

      if (sales[2] != "") {
        currentY -= 30
      newPage.drawText("Národnostní sleva: " + sales[2], {
        x: 120,
        y: currentY,
        size: 20,
      });
      }

    const jpgUrl2 = 'https://i.imgur.com/PdeeK8p.jpg';
    const jpgImageBytes2 = await fetch(jpgUrl2).then((res) => res.arrayBuffer());
    const unsplashImage2 = await pdfDoc.embedJpg(jpgImageBytes2);

    newPage.drawText("khalid se tesí na vaší návstevu", {
        x: 20,
        y: 160,
        size: 10,
      });
    newPage.drawImage(unsplashImage2, {
        x: 20,
        y: 50,
        width: newPage.getSize().width - 40,
        height: 100,
      });

      newPage.drawText("Khalid International 2006 © lololol", {
        x: 20,
        y: 20,
        size: 10,
      });

    const pdfFile = await pdfDoc.save();
    fs.writeFile("example.pdf", pdfFile, "utf8", (err, data) => {
      if (err) console.log(err);
      if (data) console.log(data);
    });
  }

router.get("/", async (req, res) => {
    await createPDF([498498,[2,true,true],[true,true,true],[5,"dd","+1000 (ew Izrael)"]])

    setTimeout(() => {  res.sendFile('example.pdf', { root: "./" }); }, 1000);;
} )

router.get("/image", async (req, res) => {
    res.sendFile('favicon.jpg', { root: "./" });
} )

router.post("", async (req,res) => {
    res.send("doesnt exist fucko")
})

router.put("/:id", async (req, res) => {
    res.send("doesnt exist fucko")
} )

router.delete("/:id", async (req, res) => {
    res.send("doesnt exist fucko")
})

const courseValidation = (course) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    })

    const result = schema.validate(course)
    return result;
}

module.exports = router