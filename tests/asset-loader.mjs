const assetPattern = /\.(png|webp)$/i;

export async function resolve(specifier, context, nextResolve) {
  if (assetPattern.test(specifier)) {
    return {
      shortCircuit: true,
      url: new URL(specifier, context.parentURL).href,
    };
  }

  return nextResolve(specifier, context);
}

export async function load(url, context, nextLoad) {
  if (assetPattern.test(url)) {
    return {
      format: "module",
      shortCircuit: true,
      source: `export default ${JSON.stringify(url)};`,
    };
  }

  return nextLoad(url, context);
}
