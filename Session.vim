let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/dev/nausikaa
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
set shortmess+=aoO
badd +9 app.js
badd +52 routes.js
badd +168 views/main.ejs
badd +1 styles/layout/responsive.scss
badd +143 styles/variables-dark.scss
badd +99 styles/components/breadcrumbs.scss
badd +41 styles/components/containers.scss
badd +98 styles/typography/typography.scss
badd +60 styles/elements/dialogs.scss
badd +1 styles/elements/links.scss
badd +195 styles/components/panels.scss
badd +6 styles/index.scss
badd +61 styles/dark.scss
badd +77 styles/variables.scss
badd +82 styles/components/tags.scss
badd +26 styles/collections/articles.scss
badd +73 styles/layout/frontpage.scss
badd +38 styles/layout/dark-mods.scss
badd +32 styles/layout/buildings.scss
badd +56 styles/collections/site-overview.scss
badd +15 styles/components/notifications.scss
badd +74 styles/components/pagination.scss
badd +203 views/documentation/components/tags.ejs
badd +1 ~/dev/nausikaa
badd +6 .gitignore
badd +169 styles/elements/inputs.scss
badd +25 styles/elements/selects.scss
badd +1 styles/elements/tables.scss
argglobal
%argdel
$argadd ~/dev/nausikaa
edit styles/elements/tables.scss
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
balt views/documentation/components/tags.ejs
setlocal foldmethod=manual
setlocal foldexpr=0
setlocal foldmarker={{{,}}}
setlocal foldignore=#
setlocal foldlevel=0
setlocal foldminlines=1
setlocal foldnestmax=20
setlocal foldenable
silent! normal! zE
let &fdl = &fdl
let s:l = 1 - ((0 * winheight(0) + 27) / 54)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 1
normal! 0
lcd ~/dev/nausikaa
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
set hlsearch
nohlsearch
let g:this_session = v:this_session
let g:this_obsession = v:this_session
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
