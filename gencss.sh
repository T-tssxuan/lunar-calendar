all=`ls css/*.less`
for a in $all
do
    lessc $a > ${a//less/css}
done


