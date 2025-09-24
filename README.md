# Millions


## Getting Started

## BACK END

- REQUISITOS

- .Net 9.0
- MongoDB compass   https://www.mongodb.com/try/download/compass

  ```bash
  git clone https://github.com/David-Sanabria97/Millions.git
  cd Millions/Back\ end
  
  ```

  crear una nueva conexion en MongoDB compass

  Crear una nueva Base de datos llamada RealEstateDataBase ( o cualquier nombre de preferencia)

  Crear 4 colecciones las cuales se encuentran en https://github.com/David-Sanabria97/Millions/tree/main/Back%20end/datos  importar los respectivos datos de cada coleccion

  Crear un archivo appsetting.json (en el campo DataBaseName colocar la base de datos que se creo en el paso anterior)

   <pre> ```json { "ConnectionStrings": { "MongoDb": "mongodb://localhost:27017" }, "DatabaseSettings": { "DatabaseName": "RealEstateDb", "Collections": { "Properties": "Properties", "PropertiesImages": "PropertiesImages", "Owners": "Owners", "PropertyTraces": "PropertyTraces" } }, "Logging": { "LogLevel": { "Default": "Information", "Microsoft.AspNetCore": "Warning" } }, "AllowedHosts": "*" } ``` </pre>

  levantar la API

```bash
  dotnet restore
  dotnet build
  dotnet run
```


```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
