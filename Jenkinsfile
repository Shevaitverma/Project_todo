pipeline {
    agent any

    stages {
        stage('updating...') {
            steps {
                echo "testing"
            }
        }
        // stage(' repo') {
        //     steps {
        //         git 'https://github.com/Shevaitverma/Project_todo.git'
        //     }
        // }
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
