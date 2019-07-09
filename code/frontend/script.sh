cd /frontend/SE231
git pull origin
cd code
cd frontend
sleep 10
echo '1'
sudo npm install
sleep 30
echo '2'
sudo npm run build
sleep 30
echo '3'
echo 'travis build done!'
