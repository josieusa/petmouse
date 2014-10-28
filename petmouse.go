package main
import (
	"strings"
	"strconv"
	"net/http"
	"io/ioutil"
	"time"
	"os/exec"
)
func main() {
	for {
		duration, _ := time.ParseDuration("50ms")
		time.Sleep(duration)
 		response, _ := http.Get("http://192.168.7.2:8000")
		defer response.Body.Close()
		contents, _ := ioutil.ReadAll(response.Body)
		coords := strings.Split(string(contents), ",")
		x, _ := strconv.ParseFloat(coords[0], 64)
		y, _ := strconv.ParseFloat(coords[1], 64)
		correction := 2.0
		xMouse := 1920*((-x + 0.5)*correction + 0.5)
		if xMouse < 0 { xMouse = 0 } else if xMouse > 1920 { xMouse = 1920}
		yMouse := 1080*((y - 0.5)*correction + 0.5)
		if yMouse < 0 { yMouse = 0 } else if yMouse > 1920 { yMouse = 1920}
		cmd := exec.Command("xdotool", "mousemove", toString(xMouse), toString(yMouse));
		cmd.Run()
	}
}
func toString(x float64) string {
	return strconv.FormatFloat(x, 'f', -1, 64)
}
