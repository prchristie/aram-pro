/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const ChampionNameLazyImport = createFileRoute('/champion/$name')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const ChampionNameLazyRoute = ChampionNameLazyImport.update({
  id: '/champion/$name',
  path: '/champion/$name',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/champion/$name.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/champion/$name': {
      id: '/champion/$name'
      path: '/champion/$name'
      fullPath: '/champion/$name'
      preLoaderRoute: typeof ChampionNameLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/champion/$name': typeof ChampionNameLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/champion/$name': typeof ChampionNameLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/champion/$name': typeof ChampionNameLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '/' | '/champion/$name'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/champion/$name'
  id: '__root__' | '/' | '/champion/$name'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  ChampionNameLazyRoute: typeof ChampionNameLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  ChampionNameLazyRoute: ChampionNameLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/champion/$name"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/champion/$name": {
      "filePath": "champion/$name.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
