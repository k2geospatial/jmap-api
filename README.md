# K2 Geospatial : JMAP API interfaces and namespace.

All public API interfaces are located in "index.ts". This interfaces are implemented by K2 dev team.

The API namespace is located/defined in typescript definition file "namespace.d.ts". It is used by k2 extensions and should be used by code that refers to the API.

This interfaces defined the contract between JMap API and its consumers.

For k2 develeopers, if you need to change this API, make all your changes and when you are done publish it to NPM :

  - if needed : npm login (username : k2-xxx, password : xxx ask Seb or Laurent for it)
  - Then edit "package.json" and update the version, that the NPM version (ex "version": "0.1.2")
  - Finally : npm publish
  - Go in the projects (JMap Web, Web extension, etc ...) where this api is used and update the "jmap-api" version in the package.json

For JMap API consumers who wrote their project in Typescript, you can simply use it via NPM package repository : 

  #npm i jmap-api -D

Like that you will be able to use the API like "JMAP_API.Services.User.logout()" in your code, and benefit from Typescript static typing.

API mapping versions :

  #JMap 7 Funafuti <=> jmap-api v0.0.1
