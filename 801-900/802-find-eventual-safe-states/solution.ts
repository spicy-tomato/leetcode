function eventualSafeNodes(graph: number[][]): number[] {
  const res: number[] = [];
  const safeNodes = new Set<number>();
  const n = graph.length;


  let hasUpdate = true;
  while(hasUpdate){
      hasUpdate = false;
      for(let i=0; i<n; i++){
          if(safeNodes.has(i)){
              continue;
          }

          const adjacentNodes = graph[i];
          if(adjacentNodes.length===0){
              safeNodes.add(i);
              hasUpdate = true;
          }else{
              let allSafeNode = true;
              for(const adjacentNode of adjacentNodes){
                  if(!safeNodes.has(adjacentNode)){
                      allSafeNode = false;
                  }
              }
              if(allSafeNode){
                  safeNodes.add(i);
                  hasUpdate = true;
              }
          }
      }
  }

  for(let i=0; i<n; i++){
    if(safeNodes.has(i)){
        res.push(i);
    }
  }

  return res;
};
