from escpos.printer import *

p = Usb(0x0416, 0x5011)
# img_source = ["hotline-preview.png", "1.jpg", "2.jpg", "3.jpg", "4.jpg"]
imgRef = "./static/img/4.jpg"
p.image(imgRef, high_density_vertical=True, high_density_horizontal=True, impl=u'bitImageRaster', fragment_height=2000)
# p.image("./static/img/"+img_source[2], high_density_vertical=True, high_density_horizontal=True, impl=u'bitImageRaster', fragment_height=960)
# p.image("./static/img/"+img_source[3], high_density_vertical=True, high_density_horizontal=True, impl=u'bitImageRaster', fragment_height=960)
