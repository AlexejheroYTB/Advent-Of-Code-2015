const discs = [{total:17,pos:1},{total:7,pos:0},{total:19,pos:2},{total:5,pos:0},{total:3,pos:0},{total:13,pos:5},{total:11,pos:0}];

next: for (let i = 0; ; i++) {
    let discsNow = [...discs];
    let time = i;
    for (const disc of discsNow) {
        time++;
        let pos = (disc.pos + time) % disc.total;
        if (pos != 0) continue next;
    }
    console.log(i);
}
