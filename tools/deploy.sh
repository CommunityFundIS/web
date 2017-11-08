set -e

yarn build -- --release
cd build && zip -r -X "../payload.zip" * && cd ..

eb deploy communityfund-production --staged

rm payload.zip
