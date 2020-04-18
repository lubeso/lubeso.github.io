using Compose, Colors, ColorBrewer

clr = palette("Blues",9)

set_default_graphic_size(1920px,1080px)

θ = collect(0:π/6:π/2)

pts = [
    [(-0.1,1.1),(-0.1 + 2cos(θ[i]),1.1 - sin(θ[i])),
     (1.1,1.1),(-0.1,1.1)] for i in 1:length(θ)
]

c = compose(context(units=UnitBox(0,0,1,1)),
    [(context(),polygon(pts[i]),fill(clr[end-i+1])) for i in 1:4]...,
    (context(),rectangle(0,0,1,1),fill(clr[6])),)


c |> SVG("img/bg.svg")