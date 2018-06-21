import "./styles/scss/main.scss";
export class Main {
    constructor(){
        import(/* webpackChunkName: "DynamicChunk" */'./scripts/Chunk').then(({ChunkClass})=>{
            new ChunkClass();
        })
    }
}

new Main();