pipeline {
    agent {
        label 'agent1' // Make sure this matches your Jenkins agent label
    }

    environment {
        FRONTEND_DIR = 'todo-client'
        BACKEND_DIR = 'server'
        DEPLOY_FRONTEND_DIR = '/var/www/html'
        DEPLOY_BACKEND_DIR = '/var/www/backend'
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
                dir("${FRONTEND_DIR}") {
                    sh '''
                    echo "📦 Installing frontend dependencies..."
                    npm ci || npm install
                    ls -la node_modules/vite || echo "❌ Vite not installed!"
                    '''
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh '''
                    echo "🔧 Building frontend..."
                    export PATH=./node_modules/.bin:$PATH
                    npm run build
                    '''
                }
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo '🚀 Deploying frontend...'
                sh '''
                sudo rm -rf ${DEPLOY_FRONTEND_DIR}/*
                sudo cp -r ${FRONTEND_DIR}/dist/* ${DEPLOY_FRONTEND_DIR}/
                '''
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir("${BACKEND_DIR}") {
                    sh '''
                    echo "📦 Installing backend dependencies..."
                    npm ci || npm install
                    '''
                }
            }
        }

        stage('Deploy Backend') {
            steps {
                echo '🚀 Deploying backend...'
                sh '''
                sudo mkdir -p ${DEPLOY_BACKEND_DIR}
                sudo rm -rf ${DEPLOY_BACKEND_DIR}/*
                sudo cp -r ${BACKEND_DIR}/* ${DEPLOY_BACKEND_DIR}/
                '''
            }
        }

        stage('Restart Backend Service') {
            steps {
                echo '🔁 Restarting backend using PM2...'
                sh '''
                if ! command -v pm2 > /dev/null; then
                    sudo npm install -g pm2
                fi
                pm2 delete backend-server || true
                pm2 start ${DEPLOY_BACKEND_DIR}/src/index.js --name backend-server
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
