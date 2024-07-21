# Shader Web

> A static web app that makes writing GLSL shaders more enjoyable!
> - think _ShaderToy_ with a better shader editing experience, but without the social/sharing aspect

**Key Features:**

- render frag shader output using WebGL
- tweak your uniforms using ui widgets and see changes in real-time!
  - use a `.toml` or `.json` config file to specify the uniform widgets 
- edit shader source code using a modern embedded code editor, or upload your file
  - supports vim, emacs
  - supports a large number of themes
- both light and dark themes for the website


---

## TODOs and Finished Tasks

- [x] frag shader rendering on a quad
- [x] select shader file from local disk
- [x] unify and prettify the ui
- [x] interactive uniform ui components
  - [x] color picker
  - [x] slider + input for numbers
  - [x] checkbox for bool
  - [x] fold-able component
  - [x] dropdown
  - [ ] image/texture component
- [x] iResolution uniform
- [ ] iMouse uniform
- [x] shader compilation error message
- [x] animation control
  - [x] pause and resume
  - [x] speed
  - [x] restart
- [x] download config
- [x] responsive design ui
- [x] manually specify viewport dimension
- [ ] **online editor (ace)**
  - [x] glsl syntax highlighting
  - [x] vim Mode
    - [x] switch between different keybindings
  - [x] themes
  - [x] font-sizes
  - [x] toggle line number and other editor settings
  - [x] load a default template
  - [x] pass code to shader
- [ ] button to toggle visibility of a panel
- [ ] icons
- [ ] access the previous frame as a uniform (also the dimension)
- [ ] create uniform components from ui (instead of writing the config by hand)
