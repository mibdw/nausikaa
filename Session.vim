let SessionLoad = 1
if &cp | set nocp | endif
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/dev/nausikaa
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +3 app.js
badd +52 routes.js
badd +168 views/main.ejs
badd +1 styles/layout/responsive.scss
badd +131 styles/variables-dark.scss
badd +99 styles/components/breadcrumbs.scss
badd +41 styles/components/containers.scss
badd +98 styles/typography/typography.scss
badd +60 styles/elements/dialogs.scss
badd +1 styles/elements/links.scss
badd +605 styles/components/panels.scss
badd +6 styles/index.scss
badd +61 styles/dark.scss
badd +10 styles/variables.scss
badd +122 styles/components/tags.scss
badd +26 styles/collections/articles.scss
badd +73 styles/layout/frontpage.scss
badd +38 styles/layout/dark-mods.scss
badd +32 styles/layout/buildings.scss
badd +56 styles/collections/site-overview.scss
badd +15 styles/components/notifications.scss
badd +45 styles/components/pagination.scss
badd +413 views/documentation/components/tags.ejs
argglobal
%argdel
$argadd .
edit styles/components/tags.scss
argglobal
balt views/documentation/components/tags.ejs
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 1 - ((0 * winheight(0) + 20) / 41)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 0
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 shortmess=filnxtToOSA
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
