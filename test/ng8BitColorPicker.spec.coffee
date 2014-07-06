describe 'EightBitColorPicker directive', ->

  # Load module and references to dependencies
  beforeEach module 'eightBitColorPicker'
  beforeEach inject (@$window, @$rootScope, @$compile) ->
    @scope = @$rootScope.$new()

  describe 'restrictions', ->

    it 'is an element directive', ->
      template = '<eight-bit-color-picker><eight-bit-color-picker>'
      el = angular.element template
      @$compile(el)(@scope)
      expect(el.html()).toContain 'ebcp'

    it 'is an attribute directive', ->
      template = '<div eight-bit-color-picker></div>'
      el = angular.element template
      @$compile(el)(@scope)
      expect(el.html()).toContain 'ebcp'

    it 'is not a class directive', ->
      template = '<div class="eight-bit-color-picker"></div>'
      el = angular.element template
      @$compile(el)(@scope)
      expect(el.html()).not.toContain 'ebcp'

  describe 'scope bindings', ->

    it 'does not modify color & palette values of parent if not set', ->
      template = '<eight-bit-color-picker><eight-bit-color-picker>'
      el = angular.element template
      @$compile(el)(@scope)
      expect(@scope.color).toBeUndefined()
      expect(@scope.palette).toBeUndefined()

    it 'takes in color & palette as scope values', ->
      template = '<eight-bit-color-picker
        color="color"
        palette="palette"
        ng-model="foo">
      <eight-bit-color-picker>'
      el = angular.element template
      @scope.color = 119
      @scope.palette = ('#ffffff' for [0..255])
      @scope.palette[119] = '#000000'

      @$compile(el)(@scope)
      expect(@scope.foo).toBe '#000000'

      @scope.color = 120
      @$rootScope.$digest()
      expect(@scope.foo).toBe '#ffffff'
