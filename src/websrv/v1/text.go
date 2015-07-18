package v1

import (
	"io"

	"github.com/lessos/lessgo/httpsrv"
	"github.com/russross/blackfriday"
)

type Text struct {
	*httpsrv.Controller
}

func (c Text) MarkdownRenderAction() {

	c.AutoRender = false

	c.Response.Out.Header().Set("Access-Control-Allow-Origin", "*")
	c.Response.Out.Header().Set("Content-type", "text/x-markdown")

	output := blackfriday.MarkdownBasic(c.Request.RawBody)

	io.WriteString(c.Response.Out, string(output))
}