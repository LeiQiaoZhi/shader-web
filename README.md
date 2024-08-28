# Shader Web

> A static web app that makes writing GLSL shaders more enjoyable!
> - think _ShaderToy_ with a better shader editing experience, but without the online features

<!-- TODO: live demo -->

**Key Features:**

- Render GLSL frag shader onto a canvas using WebGL, supports **multi-pass rendering**
- Tweak your uniforms using ui widgets and see changes in real-time!
  - Use a `.toml` or `.json` config file to specify the uniform widgets 
- Edit shader source code using a modern embedded code editor, or upload your file
  - Support **vim**, emacs, vscode, sublime keybindings
  - Support a large number of themes
- Switch between light and dark themes for the website

| Feature                                     | ***Shader Web*** | ShaderToy |
| ------------------------------------------- | ---------------- | --------- |
| Real-Time Shader Rendering                  | ✅                | ✅         |
| Custom Canvas Resolution                    | ✅                |           |
| Web-Based Editor                            | ✅                | ✅         |
| GLSL Syntax Highlighting                    | ✅                | ✅         |
| Editor Tabs                                 | ✅                | ✅         |
| Editor Keybindings (Vim, Emacs, ...)        | ✅                |           |
| Editor Themes                               | ✅                |           |
| `#include` Preprocessor                     | ✅                |           |
| Shader Inputs (`iResolution`, `iTime`, ...) | ✅                | ✅         |
| Multi-Pass Rendering                        | ✅                | ✅         |
| Custom Buffer Dimensions                    | ✅                |           |
| Tweak Uniform Values with UI widgets        | ✅                |           |
| Website dark/light theme                    | ✅                |           |
| Keyboard Input as Texture                   | ⌚                | ✅         |
| Fullscreen Canvas                           | ⌚                | ✅         |
| Screenshot and recordings                   | ⌚                | ✅         |
| Sound Input                                 |                  | ✅         |
| Online Features (Comment, Explore, ...)     |                  | ✅         |

<!-- TODO: Screenshots -->

---

## Running the App Locally

---

## TODOs and Finished Tasks 

Detailed list, for the dev's reference

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
- [ ] **I/O**
  - [ ] **iMouse uniform**
  - [ ] **keyboard texture input**
- [x] shader compilation error message
- [x] animation control
  - [x] pause and resume
  - [x] speed
  - [x] restart
- [x] download config
- [x] responsive design ui
- [x] manually specify viewport dimension
- [x] online editor (ace)
  - [x] glsl syntax highlighting
  - [x] vim mode
    - [x] switch between different keybindings
  - [x] themes
  - [x] font-sizes
  - [x] toggle line number and other editor settings
  - [x] load a default template
  - [x] pass code to shader
  - [x] export file
- [x] save file and settings on browser
  - [ ] reset editor settings only, reset shader source, reset config
- [x] button to toggle visibility of a panel
  - [x] vertical title of hidden panels
- [x] icons
- [x] animate compile status message
- [x] access the previous frame as a uniform (also the dimension)
- [x] create uniform components from ui (instead of writing the config by hand)
  - [x] modify
  - [x] delete
  - [x] create
  - [ ] reorder
- [x] tabs in editors
  - [x] scrolling tab bar
  - [x] delete
  - [x] add (empty, template)
  - [x] edit (rename)
  - [x] reorder
- [x] import preprocessor directive
- [x] keyboard shortcuts (compile, set dimension)
  - [x] compile shortcut
  - [x] editor shortcut -- find
  - [ ] **help -- list all shortcuts**
  - [ ] **tooltips**
- [x] multi-pass rendering
  - [x] frontend to create buffer shader file
  - [x] abstract render pass and texture
  - [x] save and pass previous frame of buffer
  - [x] post render pass
  - [x] improve shader status for multiple passes
  - [x] generic buffers pass
- [ ] more templates/libraries
  - [ ] state store and read from framebuffer (vec3 <=> other types)
  - [ ] noises 
  - [ ] sdfs 
  - [ ] keycodes
- [ ] screenshot
- [ ] performance -- show fps
- [ ] **export and import shaders**
  - [ ] import 
  - [ ] export with options (files in a zip, preprocessed file)
  - [ ] import from shadertoy
- [ ] true pause (stop rendering the next frame)
- [ ] embed
- [ ] pass uniforms not only to the main shader
- [ ] **more compatible with shadertoy**
  - [ ] main function
  - [ ] iResolution use vec2

Bugs and Issues:
- [ ] pause button border size inconsistent