/*node {
 	// Clean workspace before doing anything
    //deleteDir()

    try {
        stage ('Clone') {
        	checkout scm
        }
        stage ('Build') {
        	sh "echo 'shell scripts to build project...'"
        }
        stage ('Tests') {
	        parallel 'static': {
	            sh "echo 'shell scripts to run static tests...'"
	        },
	        'unit': {
	            sh "echo 'shell scripts to run unit tests...'"
	        },
	        'integration': {
	            sh "echo 'shell scripts to run integration tests...'"
	        }
        }
      	stage ('Deploy') {
            sh "echo 'shell scripts to deploy to server...'"
      	}
    } catch (err) {
        currentBuild.result = 'FAILED'
        throw err
    }
}*/
############################################################
pipeline {
    agent any
    stages {
        stage ("Checkout SCM"){
            steps{
        
           checkout([$class: 'GitSCM', branches: [[name: '*/feature/docker']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'github_credentials', url: 'https://github.com/trivedi9/CDashboard.git']]])
 


}
}
stage ("NPM install"){
   steps{
       script{
      nodejs('Node') {
    // some block

       bat "call npm install"
       bat "call npm -g install tslint typescript"
       bat "call npm install tslint typescript --save-dev"
    }
  }
   }
   }
   stage ("Unit testing"){
       steps{
           script{
nodejs('Node') {
    // some block

               bat "npm run ng test --watch true --single-run true"
               
           }
       }
   }
   }
  /* stage ("Code Quality"){
       steps{
           script{
               nodejs('Node') {
    // some block


               bat "npm run ng lint"
           }
       }
   }
   }*/
   stage ("Build the Code"){
       steps{
           script{
               nodejs('Node') {
    // some block


               bat "npm run ng build -prod"
           }
       }
   }
   }    
}
}






