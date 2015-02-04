package v1

import (
	"../../api"
	"../../conf"
	"io"
	"strings"

	"github.com/lessos/lessgo/data/rdo"
	rdobase "github.com/lessos/lessgo/data/rdo/base"
	"github.com/lessos/lessgo/pagelet"
	"github.com/lessos/lessgo/utils"
)

type TermModel struct {
	*pagelet.Controller
}

func (c TermModel) ListAction() {

	c.AutoRender = false

	rsp := api.TermModelList{
		TypeMeta: api.TypeMeta{
			APIVersion: api.Version,
		},
	}

	defer func() {

		c.Response.Out.Header().Set("Access-Control-Allow-Origin", "*")
		c.Response.Out.Header().Set("Content-type", "application/json")

		if rspj, err := utils.JsonEncode(rsp); err == nil {
			io.WriteString(c.Response.Out, rspj)
		}
	}()

	dcn, err := rdo.ClientPull("def")
	if err != nil {
		rsp.Error = &api.ErrorMeta{
			Code:    "500",
			Message: "Can not pull database instance",
		}
		return
	}

	q := rdobase.NewQuerySet().From("termx").Limit(100)
	rs, err := dcn.Base.Query(q)
	if err != nil {
		rsp.Error = &api.ErrorMeta{
			Code:    "500",
			Message: "Can not pull database instance",
		}
		return
	}

	if len(rs) > 0 {

		for _, v := range rs {

			rsp.Items = append(rsp.Items, api.TermModel{
				Metadata: api.ObjectMeta{
					ID:      v.Field("id").String(),
					Name:    v.Field("name").String(),
					UserID:  v.Field("userid").String(),
					Created: v.Field("created").TimeFormat("datetime", "atom"),
					Updated: v.Field("updated").TimeFormat("datetime", "atom"),
				},
				State:  v.Field("state").Int16(),
				SpecID: v.Field("specid").String(),
				Title:  v.Field("title").String(),
			})
		}
	}

	rsp.Kind = "TermModelList"
}

func (c TermModel) EntryAction() {

	c.AutoRender = false

	rsp := api.TermModel{
		TypeMeta: api.TypeMeta{
			APIVersion: api.Version,
		},
	}

	defer func() {

		c.Response.Out.Header().Set("Access-Control-Allow-Origin", "*")
		c.Response.Out.Header().Set("Content-type", "application/json")

		if rspj, err := utils.JsonEncode(rsp); err == nil {
			io.WriteString(c.Response.Out, rspj)
		}
	}()

	specid, modelid := c.Params.Get("specid"), c.Params.Get("modelid")
	if c.Params.Get("id") != "" {
		if s := strings.Split(c.Params.Get("id"), ","); len(s) == 2 {
			specid, modelid = s[0], s[1]
		}
	}

	model, err := conf.SpecTermModel(specid, modelid)
	if err != nil {
		rsp.Error = &api.ErrorMeta{
			Code:    "404",
			Message: "Model Not Found",
		}
		return
	}

	rsp = *model
	rsp.Kind = "TermModel"
}