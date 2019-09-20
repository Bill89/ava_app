pipeline {
  agent {
    docker {
      image 'node:10-alpine'
      args '-p 8080:8080'
    }

  }
  stages {
    stage('build') {
      steps {
        sh 'npm install'
      }
    }
  }
}