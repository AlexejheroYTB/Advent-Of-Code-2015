var ingredients = [
  {
    capacity: 5,
    durability: -1,
    flavor: 0,
    texture: 0,
    calories: 5,
  }, 
  {
    capacity: -1,
    durability: 3,
    flavor: 0,
    texture: 0,
    calories: 1,
  }, 
  {
    capacity: 0,
    durability: -1,
    flavor: 4,
    texture: 0,
    calories: 6,
  }, 
  {
    capacity: -1,
    durability: 0,
    flavor: 0,
    texture: 2,
    calories: 8,
  }, 
]

var max = 0
for (var i1 = 0; i1 <= 100; i1++) {
  for (var i2 = 0; i2 <= 100 - i1; i2++) {
    for (var i3 = 0; i3 <= 100 - i1 - i2; i3++) {
      for (var i4 = 0; i4 <= 100 - i1 - i2 - i3; i4++) {
		if (i1+i2+i3+i4 != 100) continue;
        
          var s1 = Math.max(i1 * ingredients[0].capacity + i2 * ingredients[1].capacity + i3 * ingredients[2].capacity + i4 * ingredients[3].capacity, 0);
          var s2 = Math.max(i1 * ingredients[0].durability + i2 * ingredients[1].durability + i3 * ingredients[2].durability + i4 * ingredients[3].durability, 0);
          var s3 = Math.max(i1 * ingredients[0].flavor + i2 * ingredients[1].flavor + i3 * ingredients[2].flavor + i4 * ingredients[3].flavor, 0);
          var s4 = Math.max(i1 * ingredients[0].texture + i2 * ingredients[1].texture + i3 * ingredients[2].texture + i4 * ingredients[3].texture, 0);
		  var s5 = Math.max(i1 * ingredients[0].calories + i2 * ingredients[1].calories + i3 * ingredients[2].calories + i4 * ingredients[3].calories, 0);
		  
		  var score = s1*s2*s3*s4;
		  
		  if (s5 != 500) continue;
        
        console.log(`${i1} ${i2} ${i3} ${i4} - ${s1} ${s2} ${s3} ${s4} - ${score}`);
        if (score > max) max = score;
      }
    }
  }
}

console.log(max);