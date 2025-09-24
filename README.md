# Millions


## BACK END

- REQUISITOS

- .Net 9.0
- MongoDB compass   https://www.mongodb.com/try/download/compass

  ```bash
  git clone https://github.com/David-Sanabria97/Millions.git
  cd Millions/Back\ end
  
  ```

  Crear una nueva conexion en MongoDB compass

  Crear una nueva Base de datos llamada RealEstateDataBase ( o cualquier nombre de preferencia)

  Crear 4 colecciones las cuales se encuentran en https://github.com/David-Sanabria97/Millions/tree/main/Back%20end/datos  importar los respectivos datos de cada coleccion

  Crear un archivo appsetting.json (en el campo DataBaseName colocar la base de datos que se creo en el paso anterior)

 ```json
{
  "ConnectionStrings": {
    "MongoDb": "mongodb://localhost:27017"
  },
  "DatabaseSettings": {
    "DatabaseName": "RealEstateDb",
    "Collections": {
      "Properties": "Properties",
      "PropertiesImages": "PropertiesImages",
      "Owners": "Owners",
      "PropertyTraces": "PropertyTraces"
    }
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

  Levantar la Back

```bash
  dotnet restore
  dotnet build
  dotnet run
```

## FRONT END

- REQUISITOS

- Node v22.19.0
- NPM  v10.9.3

  Para arrancar el proyecto en necesario estar ubicado en dentor de la carpeta front end
  
```bash
npm install
npm run dev
```
  Para las pruebas unitarias estan los scripts

```bash
npm run test
o
npm run test:watch   
```
