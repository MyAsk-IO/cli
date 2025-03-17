echo "Copying README.md to myask-docs"
cp README.md myask-docs/docs/index.md
echo "Entering myask-docs directory"
cd myask-docs
echo "Building MyAsk documentation"
mkdocs build
echo "Deploying MyAsk documentation to gh-pages"
mkdocs gh-deploy
echo "Checking in changed files"
git add docs/ site/
echo "Committing updated documentation"
git commit -m "Rebuilt MyAsk documentation"
echo "Entering main directory"
cd ..
echo "Adding CNAME to gh-pages"
git checkout gh-pages
echo "docs.myask.io" > CNAME
git add CNAME
git commit -m "CNAME"
git push
git checkout main
git push
echo "Finished updating, building, and deploying documentation"