# Shader Web

> A static web app that makes writing GLSL shaders more enjoyable!
> - think _ShaderToy_ with a better shader editing experience, but without the online features

live demo: https://shaderweb.netlify.app

| Feature                                     | ***Shader Web*** | ShaderToy |
|---------------------------------------------|------------------|-----------|
| Real-Time Shader Rendering                  | ✅                | ✅         |
| Custom Canvas Resolution                    | ✅                |           |
| Web-Based Editor                            | ✅                | ✅         |
| GLSL Syntax Highlighting                    | ✅                | ✅         |
| Editor Tabs                                 | ✅                | ✅         |
| Editor Keybindings (Vim, Emacs, ...)        | ✅                |           |
| Editor Themes                               | ✅                |           |
| `#include` Preprocessor                     | ✅                |           |
| Export and import from disk as zip files    | ✅                |           |
| Shader Inputs (`iResolution`, `iTime`, ...) | ✅                | ✅         |
| Multi-Pass Rendering                        | ✅                | ✅         |
| Custom Buffer Dimensions                    | ✅                |           |
| Tweak Uniform Values with UI widgets        | ✅                |           |
| Website dark/light theme                    | ✅                |           |
| Keyboard Input as Texture                   | ✅                | ✅         |
| Fullscreen Canvas                           | ⌚                | ✅         |
| Screenshot and recordings                   | ⌚                | ✅         |
| Sound Input                                 |                  | ✅         |
| Online Features (Comment, Explore, ...)     |                  | ✅         |

Screenshots:

<table>
  <tr>
    <td>
      <img src="https://github.com/user-attachments/assets/9b666858-a178-402d-8108-a05c952b496b" alt="Image 1" />
    </td>
    <td>
      <img src="https://github.com/user-attachments/assets/9c4f10b5-bd0d-4163-8873-aaf0986fbc30" alt="Image 2" />
    </td>
  </tr>
</table>



---

## Running the App Locally

> To build and run **_shader web_** on your local machine, follow the steps below:

Before you begin, make sure you have the following installed on your machine:

- **Node.js** (version 14.x or higher)
- **npm** (Node Package Manager, typically installed with Node.js)
- **Git** (for cloning the repository)

First, clone your GitHub repository to your local machine using Git.

Once the repository is cloned, navigate to the project directory:

Install the necessary dependencies for your project using npm:

```bash
npm install
```

To start the development server and run your app locally:

```bash
npm start
```

This will start the app in development mode, and you should see the app running in your default browser at `http://localhost:3000/`.

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
- [x] **I/O*
    - [x] iMouse uniform
    - [x] keyboard texture input
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
- [x] **more compatible with shadertoy**
    - [x] main function
    - [x] iResolution use vec2
    - [x] use WebGL2 + GLSL 300 es
    - [x] hide built-in code/inputs like shadertoy
- [ ] more templates/libraries
    - [ ] state store and read from framebuffer (vec3 <=> other types)
    - [ ] noises
    - [x] sdfs
    - [x] keycodes
- [ ] screenshot
- [ ] performance -- show fps
- [x] **export and import shaders**
    - [x] import
    - [ ] export with options (files in a zip, preprocessed file)
    - [ ] import from shadertoy
- [ ] true pause (stop rendering the next frame)
- [ ] embed
- [ ] pass uniforms not only to the main shader
- [ ] make some modal buttons work
  - [ ] edit uniform reset

Bugs and Issues:

- [ ] pause button border size inconsistent
- [ ] keyboard expands panel
- [ ] save shader code for compile
- [ ] some keyboard shortcuts in editor
