export const appendScript = (scr) => {
  const script = document.createElement("script");
  script.src = scr;
  document.body.appendChild(script);
};

