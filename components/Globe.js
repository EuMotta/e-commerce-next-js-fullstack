var world = tributary.world110;
var names = tributary.names;

var globe = {type: "Sphere"};
var countries = topojson.object(world, world.objects.countries)


var projection = d3.geo.orthographic()
    .scale(246)
    .translate([378, 296])
    .rotate([-17,10,3])
    .clipAngle(90);

var context = tributary.ctx;

var path = d3.geo.path()
    .projection(projection)
    .context(context);

context.fillStyle = "#237579";
context.beginPath();
path(countries);
context.fill();
  
context.strokeStyle = "#000000";
context.beginPath(), path(globe), context.stroke();
