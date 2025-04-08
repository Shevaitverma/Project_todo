pipeline {
    agent any

    stages {
        stage('updating...') {
            steps {
                echo "testing"
            }
        }
        stage('test 1...') {
            steps {
                echo "testing 1"
            }
        }
        stage('test2...') {
            steps {
                echo "testing 2"
            }
        }
    }
    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed.'
        }
    }
}
