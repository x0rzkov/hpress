// Copyright 2015 lessOS.com, All rights reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package v1

import (
	"strings"

	"github.com/lessos/lessgo/httpsrv"
	"github.com/lessos/lessgo/types"
	"github.com/lessos/lessids/idclient"
	"github.com/lessos/lessids/idsapi"

	"../../api"
	"../../config"
)

type TermModel struct {
	*httpsrv.Controller
}

func (c TermModel) EntryAction() {

	rsp := api.TermModel{
		TypeMeta: types.TypeMeta{
			APIVersion: api.Version,
		},
	}

	defer c.RenderJson(&rsp)

	if !idclient.SessionAccessAllowed(c.Session, "editor.read", config.Config.InstanceID) {
		rsp.Error = &types.ErrorMeta{idsapi.ErrCodeAccessDenied, "Access Denied"}
		return
	}

	modname, modelid := c.Params.Get("modname"), c.Params.Get("modelid")
	if c.Params.Get("id") != "" {
		if s := strings.Split(c.Params.Get("id"), ","); len(s) == 2 {
			modname, modelid = s[0], s[1]
		}
	}

	model, err := config.SpecTermModel(modname, modelid)
	if err != nil {
		rsp.Error = &types.ErrorMeta{
			Code:    api.ErrCodeBadArgument,
			Message: "Model Not Found",
		}
		return
	}

	rsp = *model
	rsp.Kind = "TermModel"
}