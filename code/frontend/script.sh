cd /frontend/SE231
git pull origin
sleep 20
cd code
cd frontend
npm install
sleep 30
npm run build
sleep 30
echo 'travis build done!'
