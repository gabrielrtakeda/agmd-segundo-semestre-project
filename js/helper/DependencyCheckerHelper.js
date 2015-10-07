function DependencyCheckerHelper(dependencies) {

    this.dependencies = dependencies;
    this.passed = true;

    this.check = function() {
        if (typeof this.dependencies === 'object')
            this.iterate();

        else if (typeof this.dependencies === 'string')
            this.verify(this.dependencies);

        return this;
    }

    this.iterate = function() {
        for (dependency of this.dependencies) this.verify(dependency);
        return this;
    }

    this.verify = function(dependency) {
        if (typeof window[dependency] === 'undefined') {
            this.showError(dependency);
            this.passed = false;
        }
        return this;
    }

    this.showError = function(dependency) {
        var message = 'Dependency of `%class` unsatisfied.'
            .replace('%class', dependency);

        console.error(message);
        return this;
    }

    this.getPassed = function() {
        return this.passed;
    }
}
