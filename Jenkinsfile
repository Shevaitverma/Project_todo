pipeline {
    agent any

    environment {
        NVM_DIR = "${HOME}/.nvm"
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
                    export NVM_DIR="$HOME/.nvm"
                    . "$NVM_DIR/nvm.sh"
                    npm install
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('todo-client') {
                    sh '''
                    export NVM_DIR="$HOME/.nvm"
                    . "$NVM_DIR/nvm.sh"
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
                    export NVM_DIR="$HOME/.nvm"
                    . "$NVM_DIR/nvm.sh"
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
                export NVM_DIR="$HOME/.nvm"
                . "$NVM_DIR/nvm.sh"
                if ! command -v pm2 > /dev/null; then
                    npm install -g pm2
                fi
                pm2 delete all || true
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
