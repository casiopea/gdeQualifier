%nodemGTM2	;
	; GT.M EWD Lite & NodeM Utility 2013/07/23 13:12
	;
	; Written by Kiyoshi Sawada <casiopea.tpine@gmail.com>
	; Copyright c 2013 Japan DynaSystems Inc.
	; 
	; This program is free software: you can redistribute it and/or modify
	; it under the terms of the GNU Affero General Public License (AGPL)
	; as published by the Free Software Foundation, either version 3 of
	; the License, or (at your option) any later version.
	; 
	; This program is distributed in the hope that it will be useful,
	; but WITHOUT ANY WARRANTY; without even the implied warranty of
	; MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
	; GNU Affero General Public License for more details.
	;
	; You should have received a copy of the GNU Affero General Public 
	; License along with this program. 
	; If not, see http://www.gnu.org/licenses/.
	q
	; --------------------------------------------------------------------
GDEewd	;
	;  GT.M GDE Qualifier show for EWD Lite 2013/07/26 10:12
	QUIT
	;
InitZgdeQualifier()	;  simple Test :   w $$InitZgdeQualifier^%nodemGTM2
	; Initialized ^%zgdequalifier global that is GDE Qualifier, 
	; call pointer
	j GDEtoArray:(IN="/dev/null":OUT="/dev/null")   ;;; hang:$ZJOB'=0 0.1
	q ""
	;
	;--------------------------------------------------------------------
GDEtoArray	;   zlink "_nodemGTM2.m"    d GDEtoArray^%nodemGTM2
	; In order to suppress the Write/zMessge to stdout,
	; execute by Job command, not Do command,
	; get GDE Qualifier to ^%zgdequalifier Global
	;
	n x,y,ver,SIZEOF,TAB,TRUE,TWO
	n update,upper,useio,v30,v44,v532,v533,v534,v542,v550,v5ft1
	n tokens,tfile,tmpacc,sep,star
	n renpref,resume,runtime,s,seghasencrflag
	n nommbi,nullsubs,ok,olabel,rec,reghasv550fields,reghasv600fields
	n gtm64,hdrlab,helpfile,i,in,io,ip,ks,l
	n label,len,log,logfile,lower,mach
	n glo,gdeerr,f,file,filesize,filexfm
	n ZERO,accmeth,am,bs,chset,combase,comlevel,comline,create,dbfilpar
	n defreg,defseg,defdb,defgld,defgldext,defglo
	n debug,encsupportedplat,endian
	n BOL,FALSE,HEX,MAXNAMLN,MAXREGLN,MAXSEGLN
	n ONE,PARNAMLN,PARREGLN,PARSEGLN
	n syntab,nams,minreg,minseg
	n segs,regs,maxreg,maxseg
	n tmpreg,tmpseg
	n iii,j,l1,s1,s2
	n map,mapreg,maps
	;
	i $$set^%LCLCOL(0)
	s (debug,runtime)=0
	s io=$io,useio="io",comlevel=0,combase=$zl,resume(0)=$zl_":INTERACT"
	i $$set^%PATCODE("M")
	d GDEINIT^GDEINIT,GDEMSGIN^GDEMSGIN,GDFIND^GDESETGD
	d CREATE^GDEGET:create,LOAD^GDEGET:'create
	d MAP
	;
	k ^%zgdequalifier
	s ^%zgdequalifier=$ZDate($H,"YEAR/MM/DD 24:60:SS")
	m ^%zgdequalifier("regs")=regs
	m ^%zgdequalifier("maxreg")=maxreg
	m ^%zgdequalifier("minreg")=minreg
	;
	m ^%zgdequalifier("segs")=segs
	m ^%zgdequalifier("maxseg")=maxseg
	m ^%zgdequalifier("minseg")=minseg
	;
	m ^%zgdequalifier("nams")=nams
	m ^%zgdequalifier("maps")=maps
	QUIT
	;
MAP	i '$d(mapreg) s mapreg=""
	e  i '$d(regs(mapreg)) zm gdeerr("OBJNOTFND"):"Region":mapreg q
	d SHOWMAKE^GDEMAP
m1	;
	s s1=$o(map("$")),iii=0
	i s1'="%" s map("%")=map("$"),s1="%"
	f  s s2=s1,s1=$o(map(s2)) q:'$l(s1)  d onemap(s1,s2)
	d onemap("...",s2)
	i $d(nams("#")) s s2="LOCAL LOCKS",map(s2)=nams("#") d onemap("",s2) k map(s2)
	q
onemap:(s1,s2)	;
	s iii=$i(iii)
	i $l(mapreg),mapreg'=map(s2) q
	s l1=$l(s1)
	i $l(s2)=l1,$e(s1,l1)=0,$e(s2,l1)=")",$e(s1,1,l1-1)=$e(s2,1,l1-1) q
	s maps(iii,"From")=$tr(s2,")","0")
	s maps(iii,"UpTo")=$tr(s1,")","0")
	s maps(iii,"Region")=map(s2)
	;
	i '$d(regs(map(s2),"DYNAMIC_SEGMENT")) d  q
	. s maps(iii,"Segment")="NONE"
	. s maps(iii,"File")="NONE"
	s j=regs(map(s2),"DYNAMIC_SEGMENT")
	s maps(iii,"Segment")=j
	i '$d(segs(j,"ACCESS_METHOD")) s s="NONE"
	e  s s=segs(j,"FILE_NAME")
	s maps(iii,"File")=s
	q
	;--------------------------------------------------------------------
FreeBlock()	;  zlink "_nodemGTM2.m"    w $$FreeBlock^%nodemGTM2
	n i,result,rn,fb,tb
	s rn=""
	f i=1:1 s rn=$view("gvnext",rn) q:rn=""  d
	. s result(i,"Region")=rn
	. s (fb,result(i,"Free"))=$v("FREEBLOCKS",rn)
	. s (tb,result(i,"Total"))=$v("TOTALBLOCKS",rn)
	. s result(i,"Percentage")=fb/tb*100.0                ;;;$j(fb/tb*100.0,6,2)
	. s result(i,"Database_file")=$v("GVFILE",rn)
	q $$arrayToJSON^%zewdJSON("result")
	;
	