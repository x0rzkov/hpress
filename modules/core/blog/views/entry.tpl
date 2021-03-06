<!DOCTYPE html>
<html lang="en">
{{pagelet . "core/general" "bs4/html-header.tpl"}}
<body id="hp-body">
{{pagelet . "core/general" "bs4/nav-header.tpl" "topnav"}}


<div class="container">
  
  <div class="hp-ctn-header">
    <h2>Content Entry</h2>
  </div>

  <div class="row">
    <div class="col-md-12">
    
      <div class="hp-nodev">
        
        <div class="header">
          <h2>{{FieldStringPrint .entry "title" .LANG}}</h2>
          <div class="hinfo">
            <span class="section">
              <img src="/hp/~/open-iconic/svg/timer.svg" width="12" height="12" class="hpdoc_icon">&nbsp;
              {{UnixtimeFormat .entry.Created "Y-m-d"}}
            </span>
            
            {{range $term := .entry.Terms}}
              {{if eq $term.Name "categories"}}
              {{if $term.Items}}
              <span class="section">
                <img src="/hp/~/open-iconic/svg/list.svg" width="12" height="12" class="hpdoc_icon">&nbsp;
                {{range $term_item := $term.Items}}
                <a href="{{$.baseuri}}/list?term_categories={{printf "%d" $term_item.ID}}">{{$term_item.Title}}</a>
                {{end}}
              </span>
              {{end}}
              {{end}}
            {{end}}
            
            {{range $term := .entry.Terms}}
              {{if eq $term.Name "tags"}}
              {{if $term.Items}}
              <span class="section">
                <img src="/hp/~/open-iconic/svg/tags.svg" width="12" height="12" class="hpdoc_icon">&nbsp;
                {{range $term_item := $term.Items}}
                <a href="{{$.baseuri}}/list?term_tags={{$term_item.Title}}" class="tag-item">{{$term_item.Title}}</a>
                {{end}}
              </span>
              {{end}}
              {{end}}
            {{end}}

          </div>
        </div>

        <div class="content hp-content">{{FieldHtmlPrint .entry "content" .LANG}}</div>
      </div>

      {{if .entry.ExtCommentEnable}}
      <div id="core-blog-comments">comments loading</div>
      {{end}}
    </div>
    
  </div>  

</div>

{{pagelet . "core/general" "bs4/footer.tpl"}}

<script type="text/javascript">
{{if .entry.ExtCommentEnable}}
window.onload_hooks.push(function() {
    seajs.use([
        "+/comment/~/index.js",
        "+/comment/~/index.css",
    ],
    function() {
        hpComment.EmbedLoader("core-blog-comments", "{{.modname}}", "{{.__datax_table__}}", "{{.entry.ID}}");
    });
});
{{end}}

window.onload_hooks.push(function() {
    hp.CodeRender();
});
</script>

{{pagelet . "core/general" "html-footer.tpl"}}
</body>
</html>

