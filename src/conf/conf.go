package conf

import (
	"encoding/json"
	"errors"
	"fmt"
	"github.com/lessos/lessgo/data/rdo/base"
	"io/ioutil"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var (
	Config ConfigCommon
)

type ConfigCommon struct {
	HttpAddr   string `json:"http_addr"`
	HttpPort   int    `json:"http_port"`
	LessIdsUrl string `json:"lessids_url"`
	Version    string
	Prefix     string
	Database   base.Config `json:"database"`
}

func Initialize(prefix string) error {

	var err error

	if prefix == "" {
		prefix, err = filepath.Abs(filepath.Dir(os.Args[0]) + "/..")
		if err != nil {
			prefix = "/opt/lesscmf"
		}
	}
	reg, _ := regexp.Compile("/+")
	Config.Prefix = "/" + strings.Trim(reg.ReplaceAllString(prefix, "/"), "/")

	file := Config.Prefix + "/etc/main.json"
	if _, err := os.Stat(file); err != nil && os.IsNotExist(err) {
		return errors.New("Error: config file is not exists")
	}

	fp, err := os.Open(file)
	if err != nil {
		return errors.New(fmt.Sprintf("Error: Can not open (%s)", file))
	}
	defer fp.Close()

	cfgstr, err := ioutil.ReadAll(fp)
	if err != nil {
		return errors.New(fmt.Sprintf("Error: Can not read (%s)", file))
	}

	if err = json.Unmarshal(cfgstr, &Config); err != nil {
		return errors.New(fmt.Sprintf("Error: "+
			"config file invalid. (%s)", err.Error()))
	}

	//
	if Config.LessIdsUrl == "" {
		return errors.New("Error: `lessids_url` can not be null")
	}

	if _, err = Config.DatabaseInstance(); err != nil {
		return err
	}

	return specInitialize()
}