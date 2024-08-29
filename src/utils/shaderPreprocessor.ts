import {EditorSources} from "./browser/browserLocalStorage";
import {BufferSource, ShaderSources} from "./contexts/ShaderContext";
import {mainShaderSuffix, ShaderFileType, shaderPrefixMap} from "./webglConstants";

export const preprocessShaderSource = (editorSources: EditorSources): ShaderSources => {
    const preprocessedMain =
        shaderPrefixMap["main"] +
        preprocessSingleShaderSource(editorSources.main.source, new Set<string>(["main"]), editorSources)
        + mainShaderSuffix;

    const preprocessedPost =
        shaderPrefixMap["post"] +
        preprocessSingleShaderSource(editorSources.post.source, new Set<string>(["post"]), editorSources);

    const bufferNames = Object.keys(editorSources).filter(fileName =>
        editorSources[fileName].type === ShaderFileType.Buffer
        && fileName !== 'main'
        && fileName !== 'post'
    )
    const preprocessedBuffers: { [name: string]: BufferSource } = {};
    bufferNames.forEach(postName => {
        preprocessedBuffers[postName] = {
            source: preprocessSingleShaderSource(editorSources[postName].source, new Set<string>([postName]), editorSources),
            width: editorSources[postName].width,
            height: editorSources[postName].height,
        }
    });

    const sources: ShaderSources = {
        main: preprocessedMain,
        post: preprocessedPost,
        buffers: preprocessedBuffers,
    };
    console.log(sources);
    return sources;
}


export const preprocessSingleShaderSource = (source: string, included: Set<string>, editorSources: EditorSources) => {
    console.log(included);
    const regex = /^#include\s+["]([\w.\-]+)["].*$/gm;
    let match;
    let preprocessed = source;
    while ((match = regex.exec(source)) !== null) {
        const fileToInclude: string = match[1];
        console.log(`preprocessing ${fileToInclude}`);
        if (!included.has(fileToInclude) && fileToInclude in editorSources) {
            included.add(fileToInclude);
            const sourceToInclude = preprocessSingleShaderSource(editorSources[fileToInclude].source, included, editorSources);
            preprocessed = preprocessed.replace(match[0], sourceToInclude);
        } else {
            console.log(fileToInclude + " already included or not an existing file name");
            preprocessed = preprocessed.replace(match[0], "");
        }
    }
    return preprocessed;
}