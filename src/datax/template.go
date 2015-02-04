package datax

import (
	"../conf"
	"bytes"
	"github.com/lessos/lessgo/pagelet"
	"html/template"
)

func Pagelet(data map[string]interface{}, args ...string) template.HTML {

	//
	if len(args) < 2 || len(args) > 3 {
		return ""
	}

	//
	specid, templatePath := args[0], args[1]
	if len(args) == 2 {
		return templateRender(data, specid, templatePath)
	}

	//
	if spec, ok := conf.Instances[specid]; ok {

		dataAction := args[2]

		for _, action := range spec.Actions {

			if action.Name != dataAction {
				continue
			}

			for _, datax := range action.Datax {

				qry := NewQuery(specid, datax.Query.Table)

				if datax.Query.Limit > 0 {
					qry.Limit(datax.Query.Limit)
				}

				if datax.Type == "list" {
					data[datax.Name] = qry.Query()
				} else if datax.Type == "entry" {
					data[datax.Name] = qry.QueryEntry()
				}
			}

			return templateRender(data, specid, templatePath)
		}
	}

	//
	return templateRender(data, specid, templatePath)
}

func templateRender(data map[string]interface{}, module, templatePath string) template.HTML {

	tplset, err := pagelet.MainTemplateLoader.Template(module, templatePath)
	if err != nil {
		return ""
	}

	var out bytes.Buffer
	if err = tplset.Render(&out, data); err != nil {
		return ""
	}

	return template.HTML(out.String())
}