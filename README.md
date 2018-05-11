# Cdashboard

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running test coverage reports

Run `npm run coverage` to execute istanbul test coverage reports on the codebase. It will generate a folder called coverage, and then view the index.html file through a web browser to see how much code coverage has been done using your test cases.

## Creating a sample test:

Your testing (spec file) should have something like this in every spec file.

`beforeEach(fakeAsync(() => {
  TestBed.configureTestingModule({
    declarations: [
      DashboardComponent
    ],
    imports: [
      SharedModule,
      RouterModule.forRoot(routes),
    ],
    providers:[
      {provide: APP_BASE_HREF, useValue: '/'},
    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
  }).overrideComponent(DashboardComponent, {
  set: {
    providers: [
      {provide: TranslateService, useClass: MockTranslation},
      {provide: DashboardService, useClass: MockDashboardService},
      {provide: MapService, useClass: MockMapService},
      { provide: Router, useValue: mockRouter},
    ]
  }
});
 fixture = TestBed.createComponent(DashboardComponent);
 fixture.detectChanges();
 component = fixture.componentInstance;
}));`

To make sure that only the tests which you want to run execute, use fdescribe instead of describe: such as follows:

`fdescribe('DashboardComponent',()=>{
...
  });`

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
