#!/bin/bash
pc=60
rc=10000
fn() {
  echo "tmp/test$1.jsonl"
}

mkdir -p tmp

rm tmp/*.jsonl

for i in $(seq 1 $pc); do
  curl -s "http://localhost:4245/api/tests?[1-$rc]" >> $(fn $i) &
    pidlist="$pidlist $!"
done

for job in $pidlist; do
  wait $job || let "FAIL+=1"
done

if [ "$FAIL" == "" ]; then
  echo "No fail!"
  md5=$(md5sum tmp/test1.jsonl | awk '{print $1}')
  for i in $seq 1 $pc; do
    c=$(md5sum tmp/test$i.jsonl | awk '{print $1}')
    if [ "$md5" != "$c" ]; then echo "bad file $i"; fi
  done
else
  echo "FAIL! ($FAIL)"
fi
