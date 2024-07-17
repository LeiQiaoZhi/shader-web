# Shader Web

> A static web app that makes writing GLSL shaders more enjoyable!
> - think _ShaderToy_ with a better shader editing experience, but without the social/sharing aspect

**Key Features:**

- render frag shader output using WebGL
- use a `.toml` config file to specify the ui components for your uniforms
- use the components to tweak your uniforms and see changes in real-time!
- both light and dark themes


---

## TODOs and Finished

- [x] frag shader rendering on a quad
- [x] select shader file from local disk
- [x] unify and prettify the ui
- [x] interactive uniform ui components
  - [x] color picker
  - [x] slider + input for numbers
  - [x] checkbox for bool
  - [x] fold-able component
  - [x] dropdown
- [x] iResolution uniform
- [x] shader compilation error message
- [x] animation control
  - [x] pause and resume
  - [x] speed
  - [x] restart
- [x] download config
- [ ] **manually specify viewport dimension**
- [ ] online editor
