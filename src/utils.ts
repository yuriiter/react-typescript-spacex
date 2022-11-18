export const isInFavourites = (launchFavourites: string[], id: string): boolean =>
  !!launchFavourites.find((launchFavourite) => launchFavourite === id)
