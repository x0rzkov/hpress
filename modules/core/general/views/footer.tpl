<footer class="hp-footer ">
  <div class="container text-center">
    <div class="pull-left">
      &copy; {{SysConfig "frontend_footer_copyright"}}
    </div>
	<div class="pull-right">
      <span class="hp-footer-powerby-item">Published by <strong><a href="https://github.com/hooto/hpress" target="_blank">Hooto Press CMS</a></strong>,</span>
      <span class="hp-footer-powerby-item">Powered by <strong><a href="https://www.sysinner.com" target="_blank">Sysinner PaaS Engine</a></strong></span>
      {{if $.frontend_langs}}
      <span class="hp-footer-powerby-item">Language
      <select onclick="hp.LangChange(this)" class="hp-footer-langs">
        {{range $v := $.frontend_langs}}
        <option value="{{$v.Id}}" {{if eq $v.Id $.LANG}}selected{{end}}>{{$v.Name}}</option>
        {{end}}
	  </select>
	  </span>
	  {{end}}
    </div>
  </div>
</footer>
{{raw (SysConfig "frontend_footer_analytics_scripts")}}
