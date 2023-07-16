const applyTheme = (theme, classNames) => {
    if (!theme) {
      return classNames;
    }
    const themed = {};
    Object.keys(classNames).forEach(className => {
      // By default the class is unthemed
      themed[className] = classNames[className];
  
      // But if theme_class exists (e.g. dark_link or pink_home) then we append the themed class
      // This way, in our .module.css we can say .home { margin: 10px; color: black; } .pink_home { color: pink; }
      // i.e. we don't have to repeat the base styles, the themed classes just extend the base ones
      const themedClass = classNames[`${theme}_${className}`];
      if (themedClass) {
        themed[className] += ` ${themedClass}`;
      }
    });
    return themed;
  };

  export { applyTheme };

  export default applyTheme;
