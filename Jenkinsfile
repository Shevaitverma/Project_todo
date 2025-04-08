pipeline {
    agent any

    stages {
        stage('updating...') {
            steps {
                sh 'sudo apt update'
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
