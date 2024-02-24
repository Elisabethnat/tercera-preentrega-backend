import { Server } from "socket.io";

// Conexion Socket.io
export const configureSocket = (httpServer) => {
  const io = new Server(httpServer);
  const mensajes = [];

  io.on("connection", (socket) => {
    console.log("Conexion con Socket io");

    socket.on("mensaje", (info) => {
      console.log(info);
      mensajes.push(info);
      io.emit("mensajes", mensajes); 
    });

    // socket.on('load', async () => {
    //     const products = await productManager.getProducts();
    //     socket.emit('products', products);
    // });

    // socket.on('newProduct', async product => {
    //     await productManager.addProducts(product);
    //     const products = await productManager.getProducts();
    //     socket.emit('products', products);
    // });

    // socket.on("newProduct", (product) => {
    //   console.log(product);
    //   socket.emit("mensajeProductoCreado", "Producto creado correctamente");
    // });
  });
};

