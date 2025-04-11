pipeline {
    agent any

    environment {
        NODE_ENV = 'production'
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'githubToken', url: 'https://github.com/Shevaitverma/Project_todo.git'
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('todo-client') {
                    sh '''
                    echo "Installing frontend dependencies..."
                    node -v
                    npm install
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('todo-client') {
                    sh '''
                    echo "Building frontend..."
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo 'Deploying frontend to production folder...'
                sh '''
                sudo rm -rf /var/www/html/*
                sudo cp -r todo-client/dist/* /var/www/html/
                '''
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('server') {
                    sh '''
                    echo "Installing backend dependencies..."
                    npm install
                    '''
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                echo 'Deploying backend to /var/www/backend ...'
                sh '''
                sudo mkdir -p /var/www/backend
                sudo rm -rf /var/www/backend/*
                sudo cp -r server/* /var/www/backend/
                '''
            }
        }

        stage('Restart Backend Service') {
            steps {
                echo 'Restarting backend Node.js server using PM2...'
                sh '''
                if ! command -v pm2 > /dev/null; then
                    sudo npm install -g pm2
                fi
                pm2 delete backend-server || true
                pm2 start /var/www/backend/index.js --name backend-server
                pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Frontend and Backend Deployed successfully!'
        }
        failure {
            echo '❌ Deployment failed. Check console output.'
        }
    }
}
