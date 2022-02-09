/*
  This script initializes the metadata containers and entity
  registries.
  Include this first, always in the root file.
*/
import 'reflect-metadata'
import Container from 'typedi'
import * as typeORMExtensions from 'typeorm-typedi-extensions'
import * as routingControllers from 'routing-controllers'
import * as typeORM from 'typeorm'

typeORM.useContainer(typeORMExtensions.Container)
routingControllers.useContainer(Container)
